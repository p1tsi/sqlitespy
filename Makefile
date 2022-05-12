default: compile-agent

compile-agent:
	cd agent && npm install && npm run build

