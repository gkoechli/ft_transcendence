"use client";

import { Button } from "@web/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@web/components/ui/form"
import { Input } from "@web/components/ui/input"
import { Switch } from "@web/components/ui/switch"
import { Card } from "./card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

export function FACard() {
	const formSchema = z.object({
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
	})

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="p-6">
						<div className="flex items-center">
							<h4 className="text-2xl font-semibold text-white">
								2FA
							</h4>
							<Switch className="ml-4 "/>
						</div>
						<p className="my-3 dark:text-gray-300">
							This is the email address where we will send your 2FA codes.
						</p>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="example@domain.com" {...field} autoComplete="off" className="max-w-md border-gray-700 bg-gray-900" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<footer className="min-h-[57px] border-t-[1px] border-gray-700 py-3 px-6">
						<div className="flex items-center">
							<div>
								<p className="dark:text-gray-400">
									This will add a verification step after login.
								</p>
							</div>
							<div className="m-auto mr-0">
								<Button size="sm" className="h-8 font-medium" type="submit">
									Save
								</Button>
							</div>
						</div>
					</footer>
				</form>
			</Form>
		</Card>
	)
}
