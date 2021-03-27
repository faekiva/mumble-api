FROM golang:buster
WORKDIR /opt/go
RUN go get -u layeh.com/murmur-cli \
    && go get -u google.golang.org/grpc \
    && go get -u github.com/golang/protobuf/proto \ 
    && go get -u github.com/golang/protobuf/protoc-gen-go
# RUN wget https://raw.githubusercontent.com/mumble-voip/mumble/master/src/murmur/MurmurRPC.proto \
#     && mkdir MurmurRPC \ 
#     && protoc -I. --plugin=$GOPATH/bin/protoc-gen-go --go_out=plugins=grpc:MurmurRPC MurmurRPC.proto
# COPY ./nudge.go /opt/go
# CMD ["go", "run", "/opt/go/nudge.go"]
CMD ["/bin/bash"]