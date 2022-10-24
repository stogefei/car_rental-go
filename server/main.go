package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	trip "coolcar/tripservice"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"log"
	"net"
	"net/http"
)

func main() {
	log.SetFlags(log.Llongfile)
	go startGRPCGateway()
	lis, err := net.Listen("tcp", ":8089")
	if err != nil {
		log.Printf("failed to listen:%v", err)
	}
	s := grpc.NewServer()
	trippb.RegisterTripServiceServer(s, &trip.Service{})
	log.Fatal(s.Serve(lis))
}

func startGRPCGateway() {
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()
	mux := runtime.NewServeMux(runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{}))
	err := trippb.RegisterTripServiceHandlerFromEndpoint(
		c,
		mux,
		"localhost:8089",
		[]grpc.DialOption{grpc.WithInsecure()},
	)

	if err != nil {
		log.Fatalf("canot start grpc gateway:%v", err)
	}
	err = http.ListenAndServe(":8080", mux)
	log.Fatalf("cantnot listen and server:%v", err)
}
