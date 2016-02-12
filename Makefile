start:
	PORT=80 \
	SECRET='flamebroilers' \
	MONGOHQ_URL='mongodb://localhost:27017/Fleet' \
	node app

.PHONY: test db start
