const uiOptions = {
	objectMode: true,
};

const guardianOptions = {
	readableObjectMode: true,
	writableObjectMode: true,
	decodeStrings: false,
};

const accountManagerOptions = {
	objectMode: true,
};

const algorithm = "aes192";
const password =
	"cYyFwguRBhzrdkKUmqzsDh5fJJrTVAzpmDG4vQbjz8Mm4fvrYqF2ussWWkAYFgELbDsYkGRLCc3mUYwzQRjeMSzxHT4efMNRA7R6hy45dPth8s9WdzL4Up8cpZ6tHX9X";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC1mL2M1GYT2rUGNNQHVJdF7TyKLYPqgvv9VfOdgPDgm8E8edzJ
kip1ajfymrODg0m7U95sUOw1s1r/WZzLdIPHgDxbLHrDbQEWVgdTM2okje7pPOax
7PguhGHd2y2WEXGBUNXG0jQCyfq83nDl3YwJuPKNpgEPzzxibg8j3suKaQIDAQAB
AoGAA9LniuOeEqT0UuEh5dWeKdbJA4/Zy0Je1ALPUm24pMIi24clYwk046wM6Yrg
ZNCK6OrnMBi0IJ1aOS5F4vLdI3k2tcKmtdHlVHQl3YZZLUBubJF8HPZHyhYlargY
gWYMC8Wi2Z63fllb+A5yVgJZigEowkYzQSg1LS09vkMJL5ECQQDcM3DzC3qvp3AV
6p5uGKFI1nug4Y8XQvQZHRRoZL0UuRnCJZR/4OpI2rjWNXwsYibf7V0PZ3FXPajZ
gkVtnpbLAkEA0x6fxNlOkD6AIgAy4EW26eLRDuh8LSDBG/a2nfdRduMa0PwFglmT
heOmFqD8fJA4bCvhYl/cKCo/cGQmRj2JGwJBAJNmo+8t+fxnWvJw0YjlV+GIIc25
760kln3RJ34SITgkCAgcW+GWT35hW2WY+/xB37/6BldvaUF69vJS7+LHTC0CQCEP
n6d8/E+cagZpD46NfEp+KYzzHVcX1QXjCdANBeXfRLjLbrVt/6ss7jqG9WMwVpWh
/YahSmHD0/FuzYucYVcCQQDOL5EooCObADlMZwW6gkfRUhg8qNpLIKjZqdR2TOef
3MliwMWCHG2zzgsz8h+H/sQ9tWT+RCq8xA0RCJTcc/yk
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN CERTIFICATE-----
MIICATCCAWoCCQCuCSyS6Uak9jANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJB
VTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0
cyBQdHkgTHRkMB4XDTE5MDIwNTA5NDkxOFoXDTE5MDMwNzA5NDkxOFowRTELMAkG
A1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoMGEludGVybmV0
IFdpZGdpdHMgUHR5IEx0ZDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAtZi9
jNRmE9q1BjTUB1SXRe08ii2D6oL7/VXznYDw4JvBPHncyZIqdWo38pqzg4NJu1Pe
bFDsNbNa/1mcy3SDx4A8Wyx6w20BFlYHUzNqJI3u6Tzmsez4LoRh3dstlhFxgVDV
xtI0Asn6vN5w5d2MCbjyjaYBD888Ym4PI97LimkCAwEAATANBgkqhkiG9w0BAQsF
AAOBgQBoFLPxmm3TL+PBBcXoOGaRbbvGelwXsXgEZCdr+RxMchmbgcKcjc+2+VGa
eiiF3RMGjmz2KtYwg0uv2R331EqBzvmgRnoNH/1tnWmJPylcF2eCzG+NSc4kWNRN
6ZrCfAkaih1l+niEkWeWMTcRns6hTwJ+yrm/ijs0u8nL1XhAkg==
-----END CERTIFICATE-----`;

export {
	uiOptions,
	guardianOptions,
	accountManagerOptions,
	algorithm,
	password,
	privateKey,
	publicKey,
};
