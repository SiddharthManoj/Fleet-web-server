start:
	PORT=80 \
	SECRET='flamebroilers' \
	MONGOHQ_URL='mongodb://localhost:27017/fleet' \
	node app

.PHONY: test db start
