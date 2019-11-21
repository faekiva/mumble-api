const IP_OCTETS = 4
const IPv4_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export class Ipv4FormatException extends Error {

    constructor() {
        super();
    }

}

export class IPv4 {

    public octets = new Array<number>();
    
    constructor(address: Uint8Array | string) {
        if (address instanceof Uint8Array) {
            this.loadMurmurAddress(address);
        } else {
            this.loadRestAddress(address);
        }
    }

    private loadMurmurAddress (address: Uint8Array) {
        for (let numDex = (address.length - IP_OCTETS); numDex < address.length; numDex++) {
            this.octets.push(address[numDex])
        }    
    }

    private loadRestAddress(address: string) {
        let matches = address.match(IPv4_REGEX)
        if (Boolean(matches))
        {
            try {
                matches = (matches as RegExpMatchArray)
                for (let matchDex = 1; matchDex <= IP_OCTETS; matchDex++) {
                    this.octets.push(Number(matches[matchDex]))
                }
            } catch {
                throw new Ipv4FormatException();
            }
        } else {
            throw new Ipv4FormatException();
        }
    }

    public Equals(other: IPv4) : boolean {
        for (let index = 0; index < IP_OCTETS; index++) {
            if (this.octets[index] !== other.octets[index]) {
                return false;
            }
        }
        return true;
    }

    public In(ips: Array<IPv4>): boolean {
        return ips.some((ip)=> {ip.Equals(this)})
    }

}