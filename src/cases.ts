export type Locations = "CHEMIST" | "BANK" | "CARRIAGE DEPOT" | "DOCKS" | "HOTEL" | "LOCKSMITH" | "MUSEUM" | "NEWSAGENT" | "PARK" | "PAWNBROKER" | "THEATRE" | "BOAR'S HEAD" | "SCOTLAND YARD" | "TOBACCONIST";

export default {
	"1": {
		location: {
			"CHEMIST":         3,
			"BANK":            28,
			"CARRIAGE DEPOT":  58,
			"DOCKS":           76,
			"HOTEL":           115,
			"LOCKSMITH":       136,
			"MUSEUM":          168,
			"NEWSAGENT":       191,
			"PARK":            218,
			"PAWNBROKER":      243,
			"THEATRE":         280,
			"BOAR'S HEAD":     304,
			"SCOTLAND YARD":   351,
			"TOBACCONIST":     384,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"2": {
		location: {
			"CHEMIST":         106,
			"BANK":            209,
			"CARRIAGE DEPOT":  234,
			"DOCKS":           52,
			"HOTEL":           289,
			"LOCKSMITH":       313,
			"MUSEUM":          15,
			"NEWSAGENT":       346,
			"PARK":            134,
			"PAWNBROKER":      365,
			"THEATRE":         87,
			"BOAR'S HEAD":     393,
			"SCOTLAND YARD":   176,
			"TOBACCONIST":     262,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"3": {
		location: {
			"CHEMIST":         128,
			"BANK":            158,
			"CARRIAGE DEPOT":  64,
			"DOCKS":           184,
			"HOTEL":           254,
			"LOCKSMITH":       5,
			"MUSEUM":          272,
			"NEWSAGENT":       382,
			"PARK":            49,
			"PAWNBROKER":      312,
			"THEATRE":         102,
			"BOAR'S HEAD":     416,
			"SCOTLAND YARD":   221,
			"TOBACCONIST":     333,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"4": {
		location: {
			"CHEMIST":         207,
			"BANK":            6,
			"CARRIAGE DEPOT":  251,
			"DOCKS":           163,
			"HOTEL":           328,
			"LOCKSMITH":       226,
			"MUSEUM":          372,
			"NEWSAGENT":       86,
			"PARK":            408,
			"PAWNBROKER":      292,
			"THEATRE":         125,
			"BOAR'S HEAD":     187,
			"SCOTLAND YARD":   344,
			"TOBACCONIST":     46,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"5": {
		location: {
			"CHEMIST":         96,
			"BANK":            230,
			"CARRIAGE DEPOT":  50,
			"DOCKS":           282,
			"HOTEL":           72,
			"LOCKSMITH":       190,
			"MUSEUM":          315,
			"NEWSAGENT":       16,
			"PARK":            253,
			"PAWNBROKER":      165,
			"THEATRE":         360,
			"BOAR'S HEAD":     123,
			"SCOTLAND YARD":   402,
			"TOBACCONIST":     369,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"6": {
		location: {
			"CHEMIST":         10,
			"BANK":            31,
			"CARRIAGE DEPOT":  130,
			"DOCKS":           270,
			"HOTEL":           319,
			"LOCKSMITH":       378,
			"MUSEUM":          153,
			"NEWSAGENT":       62,
			"PARK":            352,
			"PAWNBROKER":      196,
			"THEATRE":         298,
			"BOAR'S HEAD":     26,
			"SCOTLAND YARD":   225,
			"TOBACCONIST":     119,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"7": {
		location: {
			"CHEMIST":         108,
			"BANK":            198,
			"CARRIAGE DEPOT":  37,
			"DOCKS":           259,
			"HOTEL":           147,
			"LOCKSMITH":       269,
			"MUSEUM":          7,
			"NEWSAGENT":       350,
			"PARK":            159,
			"PAWNBROKER":      386,
			"THEATRE":         309,
			"BOAR'S HEAD":     70,
			"SCOTLAND YARD":   410,
			"TOBACCONIST":     214,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
	"8": {
		location: {
			"CHEMIST":         63,
			"BANK":            121,
			"CARRIAGE DEPOT":  247,
			"DOCKS":           340,
			"HOTEL":           275,
			"LOCKSMITH":       35,
			"MUSEUM":          369,
			"NEWSAGENT":       171,
			"PARK":            302,
			"PAWNBROKER":      419,
			"THEATRE":         95,
			"BOAR'S HEAD":     376,
			"SCOTLAND YARD":   223,
			"TOBACCONIST":     182,
		},
		answers: {
			a: "",
			b: "",
			c: "",
			d: "",
			e: ""
		}	
	},
	"9": {
		location: {
			"CHEMIST":         132,
			"BANK":            12,
			"CARRIAGE DEPOT":  193,
			"DOCKS":           246,
			"HOTEL":           44,
			"LOCKSMITH":       321,
			"MUSEUM":          170,
			"NEWSAGENT":       342,
			"PARK":            66,
			"PAWNBROKER":      228,
			"THEATRE":         367,
			"BOAR'S HEAD":     100,
			"SCOTLAND YARD":   390,
			"TOBACCONIST":     291,
		},
		answers: {
			a: "",
			b: ""
		}	
	},
	"10": {
		location: {
			"CHEMIST":         4,
			"BANK":            151,
			"CARRIAGE DEPOT":  286,
			"DOCKS":           181,
			"HOTEL":           311,
			"LOCKSMITH":       33,
			"MUSEUM":          404,
			"NEWSAGENT":       213,
			"PARK":            337,
			"PAWNBROKER":      69,
			"THEATRE":         248,
			"BOAR'S HEAD":     371,
			"SCOTLAND YARD":   131,
			"TOBACCONIST":     94,
		},
		answers: {
			a: "",
			b: "",
			c: ""
		}	
	},
} as {
	[key: string]: {
		location: {[name in Locations]: number},
		answers: {[letter: string]: string}
	}
}