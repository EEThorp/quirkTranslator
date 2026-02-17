//strong curse filter, filters fake curses

const strictCurseData = `baloney	b*l*ney
blast	bl*st
blasted	bl*sted
bucket	b*cket
crap	cr*p
crapping	cr*pping
dang	d*ng
darn	d*rn
drat	dr*t
fanny	f*nny
fiddlesticks	f*ddlest*x
flip	fl*p
flipping	fl*pping
fooey	f**ey
fudge	f*dge
fudging	f*dging
gaper	g*per
geez	g**z
golly	g*lly
gosh	g*sh
goshdarn	g*shd*rn
heck	h*ck
jeepers	j**pers
kerfuffle	k*rfuffle
load	l*ad
phooey	ph**ey
potty	p*tty
pottymouth	p*ttymouth
rascally	r*scally
ridiculous	r*d*culous
screw	scr*w
shoot	sh*ot
silly	s*lly
smitten	sm*tten
sugar	s*gar
tittilating	t*tillating
whoops	wh**ps
Baloney	B*l*ney
Blast	Bl*st
Blasted	Bl*sted
Bucket	B*cket
Crap	Cr*p
Crapping	Cr*pping
Dang	D*ng
Darn	D*rn
Drat	Dr*t
Fanny	F*nny
Fiddlesticks	F*ddlest*x
Flip	Fl*p
Flipping	Fl*pping
Fooey	F**ey
Fudge	F*dge
Fudging	F*dging
Gaper	G*per
Geez	G**z
Golly	G*lly
Gosh	G*sh
Goshdarn	G*shd*rn
Heck	H*ck
Jeepers	J**pers
Kerfuffle	K*rfuffle
Load	L*ad
Phooey	Ph**ey
Potty	P*tty
Pottymouth	P*ttymouth
Rascally	R*scally
Ridiculous	R*d*culous
Screw	Scr*w
Shoot	Sh*ot
Silly	S*lly
Smitten	Sm*tten
Sugar	S*gar
Tittilating	T*tillating
Whoops	Wh**ps
BALONEY	B*L*NEY
BLAST	BL*ST
BLASTED	BL*STED
BUCKET	B*CKET
CRAP	CR*P
CRAPPING	CR*PPING
DANG	D*NG
DARN	D*RN
DRAT	DR*T
FANNY	F*NNY
FIDDLESTICKS	F*DDLEST*X
FLIP	FL*P
FLIPPING	FL*PPING
FOOEY	F**EY
FUDGE	F*DGE
FUDGING	F*DGING
GAPER	G*PER
GEEZ	G**Z
GOLLY	G*LLY
GOSH	G*SH
GOSHDARN	G*SHD*RN
HECK	H*CK
JEEPERS	J**PERS
KERFUFFLE	K*RFUFFLE
LOAD	L*AD
PHOOEY	PH**EY
POTTY	P*TTY
POTTYMOUTH	P*TTYMOUTH
RASCALLY	R*SCALLY
RIDICULOUS	R*D*CULOUS
SCREW	SCR*W
SHOOT	SH*OT
SILLY	S*LLY
SMITTEN	SM*TTEN
SUGAR	S*GAR
TITTILATING	T*TILLATING
WHOOPS	WH**PS`;

//parse the tab-separated data into array of [word, replacement] pairs
const lines = strictCurseData.split('\n');
const pairs = lines.map(line => {
    const [word, replacement] = line.split('\t');
    return [word, replacement];
});
//sort by word length (longest first) to prevent partial replacements
export const strictCurseFiltered = pairs.sort((a, b) => b[0].length - a[0].length);
