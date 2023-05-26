import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    private websocket: WebSocket;

    start() {
        console.info('Hello world');

        let url = "ws://localhost:44346";
        this.websocket = new WebSocket(url);
        this.websocket.binaryType = "arraybuffer";

        setTimeout(() => {
            console.log('sleep');
            let sendData: ArrayBuffer;
            sendData = this.str2ab("ritter");
            this.websocket.send(sendData);
        }, 1000);
    }

    private str2ab(str: string): any {
        let n = str.length,
            idx = -1,
            byteLength = 512,
            bytes = new Uint8Array(byteLength),
            i, c, _bytes;

        for (i = 0; i < n; ++i) {
            c = str.charCodeAt(i);
            if (c <= 0x7F) {
                bytes[++idx] = c;
            } else if (c <= 0x7FF) {
                bytes[++idx] = 0xC0 | (c >>> 6);
                bytes[++idx] = 0x80 | (c & 0x3F);
            } else if (c <= 0xFFFF) {
                bytes[++idx] = 0xE0 | (c >>> 12);
                bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
                bytes[++idx] = 0x80 | (c & 0x3F);
            } else {
                bytes[++idx] = 0xF0 | (c >>> 18);
                bytes[++idx] = 0x80 | ((c >>> 12) & 0x3F);
                bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
                bytes[++idx] = 0x80 | (c & 0x3F);
            }
            if (byteLength - idx <= 4) {
                _bytes = bytes;
                byteLength *= 2;
                bytes = new Uint8Array(byteLength);
                bytes.set(_bytes);
            }
        }
        return bytes.subarray(0, ++idx);
    }

    update(deltaTime: number) {
        
    }
}


