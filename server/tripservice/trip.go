package trip

import (
	"context"
	trippb "coolcar/proto/gen/go"
)

//type TripServiceServer interface {
//	GetTrip(context.Context, *GetTripRequest) (*GetTripResponse, error)
//}

type Service struct {
}

func (*Service) GetTrip(c context.Context, req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id: req.Id,
		Trip: &trippb.Trip{
			Start:       "abc",
			End:         "def",
			DurationSec: 10000,
			FeeCent:     100000,
			Status:      trippb.TripStatus_TS_NOT_SPECIFIED,
		},
	}, nil
}
