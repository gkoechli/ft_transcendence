NAME = ft_transcendence

PACKAGE_MANAGER = npm

SRC_FRONTEND = ./frontend
SRC_BACKEND = ./backend

all: deps $(NAME)

run: $(NAME)

$(NAME):
	$(PACKAGE_MANAGER) run dev

deps:
	$(PACKAGE_MANAGER) install
	$(PACKAGE_MANAGER) install --prefix $(SRC_BACKEND)
	$(PACKAGE_MANAGER) install --prefix $(SRC_FRONTEND)