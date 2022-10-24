DOMAIN=$1

protoc -I=. --go_out=plugins=grpc,paths=source_relative:gen/go trip.proto
protoc -I=. --grpc-gateway_out=paths=source_relative,grpc_api_configuration=trip.yaml:gen/go trip.proto

PBTS_BIN_DIR=../../mini/miniprogram/node_modules/.bin
PBTS_OUT_DIR=../../mini/miniprogram/service/proto_gen/${DOMAIN}
mkdir -p $PBTS_OUT_DIR
$PBTS_BIN_DIR/pbjs -t static -w es6 trip.proto --no-create --no-encode --no-decode --no-verify --no-delimited --force-number -o $PBTS_OUT_DIR/${DOMAIN}_pb_tmp.js
echo 'import * as $protobuf from "protobufjs";\n' > $PBTS_OUT_DIR/${DOMAIN}_pb.js
cat $PBTS_OUT_DIR/${DOMAIN}_pb_tmp.js >> $PBTS_OUT_DIR/${DOMAIN}_pb.js
rm $PBTS_OUT_DIR/${DOMAIN}_pb_tmp.js
$PBTS_BIN_DIR/pbts -o $PBTS_OUT_DIR/${DOMAIN}_pb.d.ts $PBTS_OUT_DIR/${DOMAIN}_pb.js