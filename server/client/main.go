package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
	"google.golang.org/grpc"
	"log"
)

func main() {
	conn, err := grpc.Dial("localhost:8089", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("cannot connect server:%v", err)
	}
	tsclient := trippb.NewTripServiceClient(conn)
	r, err := tsclient.GetTrip(context.Background(), &trippb.GetTripRequest{
		Id: "trips343434",
	})
	if err != nil {
		log.Fatalf("canot call GetTrip:%v", err)
	}
	fmt.Println(r)
}
