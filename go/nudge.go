

import (
	"google.golang.org/grpc",
	"fmt"
)

func main() {
	conn, err := grpc.Dial("127.0.0.1:50051", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	fmt.Println("hello world")
	defer conn.Close()
	fmt.Println("hello world")
}