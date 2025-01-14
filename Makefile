# Build the Go project and place the output binary in the 'bin' directory
build:
	@go build -o bin/gobank

# Run the compiled binary; ensures it is built first
run: build
	@./bin/gobank
# Run all tests in the project with verbose output
test:
	@go test -v ./...
