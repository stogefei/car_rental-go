package main

import (
	trippb "coolcar/proto/gen/go"
	"encoding/json"
	"fmt"
	"google.golang.org/protobuf/proto"
)

func main() {
	trip := trippb.Trip{
		Start:       "abc",
		End:         "def",
		DurationSec: 10000,
		FeeCent:     100000,
	}
	//fmt.Print(&trip)
	b, err := proto.Marshal(&trip)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%X\n", b)
	var trip2 trippb.Trip
	proto.Unmarshal(b, &trip2)
	fmt.Println(&trip2)

	b, err = json.Marshal(&trip2)
	fmt.Printf("%s\n", b)
}
