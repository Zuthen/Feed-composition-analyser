import {JSX} from 'react'

type CatIconProps = {
    height: string,
    width: string,
    fill?: string,
    stroke?: string
}
const CatIcon= ( {height, stroke, width, fill}: CatIconProps) : JSX.Element=> {
    return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width={width} height={height} viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={fill? fill : "black"} stroke={stroke? stroke: "black"}>
        <path d="M580 4871 c-14 -4 -39 -15 -55 -24 -111 -58 -183 -240 -200 -504 -11
        -170 0 -241 139 -883 72 -331 96 -471 103 -600 5 -103 5 -107 -36 -235 -23
    -71 -56 -197 -72 -280 -17 -82 -32 -151 -33 -152 -1 -1 -44 9 -95 23 -77 21
    -97 24 -121 14 -38 -16 -56 -60 -41 -99 15 -34 30 -42 147 -72 l91 -23 -1
    -218 -1 -218 -127 0 c-73 0 -138 -5 -152 -11 -55 -26 -55 -112 0 -138 15 -6
    84 -11 174 -11 l149 0 20 -55 c147 -392 522 -729 1041 -937 391 -156 848 -230
    1235 -199 538 43 1035 220 1410 502 83 62 240 212 298 284 73 92 156 238 198
    350 l20 55 149 0 c90 0 159 5 174 11 55 26 55 112 0 138 -14 6 -79 11 -152 11
    l-127 0 0 218 0 217 85 22 c117 31 137 40 150 74 16 39 -2 83 -40 99 -24 10
    -44 7 -121 -14 -51 -14 -94 -24 -95 -23 -1 1 -16 70 -33 152 -16 83 -49 209
    -72 280 -41 129 -41 131 -36 240 7 136 36 294 131 730 107 489 110 506 109
    685 -1 304 -72 500 -208 573 -75 41 -283 25 -475 -35 -258 -81 -502 -239 -745
    -482 -83 -83 -249 -275 -271 -314 -1 -2 -55 6 -120 18 -275 48 -527 49 -805 4
    -58 -9 -117 -14 -130 -11 -16 4 -52 40 -95 94 -88 112 -276 302 -379 383 -294
    233 -570 348 -868 365 -50 2 -103 1 -117 -4z m121 -192 c142 -91 370 -299 504
    -459 181 -217 296 -449 311 -631 7 -95 19 -124 55 -139 39 -17 83 2 99 41 27
    64 -20 285 -93 442 -103 220 -302 473 -532 677 -73 64 -57 61 110 -21 247
    -122 473 -317 707 -609 25 -31 64 -66 91 -80 l47 -25 0 -182 c0 -114 4 -191
    11 -207 26 -55 112 -55 138 0 7 16 11 95 11 213 l0 188 83 11 c45 6 117 14
    160 18 l77 7 0 -366 c0 -251 4 -374 11 -391 26 -55 112 -55 138 0 7 17 11 140
    11 391 l0 366 78 -7 c42 -4 114 -12 160 -18 l82 -11 0 -188 c0 -118 4 -197 11
    -213 26 -55 112 -55 138 0 7 15 11 89 11 193 l0 169 25 6 c16 4 49 38 91 94
    234 310 503 541 776 666 121 55 129 55 63 -4 -230 -204 -429 -458 -533 -679
    -72 -155 -119 -377 -92 -440 16 -39 60 -58 99 -41 36 15 48 44 55 139 15 182
    129 412 311 631 139 166 421 418 541 482 40 21 43 21 69 4 64 -42 115 -231
    115 -431 0 -129 -14 -213 -111 -658 -44 -203 -87 -414 -97 -468 -9 -55 -20
    -98 -23 -97 -4 2 -39 51 -77 109 -123 187 -347 424 -456 482 -40 21 -76 11
    -101 -27 -27 -41 -12 -78 50 -126 85 -66 274 -267 347 -370 169 -238 301 -571
    351 -883 l14 -86 -51 -15 c-28 -8 -175 -47 -326 -87 -289 -77 -320 -91 -320
    -142 0 -39 36 -77 73 -77 18 0 167 36 331 80 165 44 302 77 305 74 9 -9 14
    -272 6 -331 l-6 -53 -279 0 c-186 0 -287 -4 -304 -11 -55 -26 -55 -112 0 -138
    16 -7 112 -11 279 -11 167 0 255 -4 255 -10 0 -6 -20 -50 -44 -99 -269 -534
    -1077 -931 -1896 -931 -716 0 -1451 312 -1788 759 -54 72 -152 246 -152 270 0
    8 111 11 375 11 257 0 382 4 399 11 55 26 55 112 0 138 -17 7 -148 11 -423 11
    l-398 0 -7 37 c-9 55 -7 326 2 340 6 10 115 -16 441 -103 475 -126 475 -126
    501 -63 19 45 -2 84 -54 103 -22 9 -205 59 -406 111 -201 53 -388 103 -416
    111 l-51 15 14 87 c49 307 183 645 351 882 64 90 284 323 364 386 50 39 59 80
    26 119 -51 59 -113 28 -288 -145 -105 -104 -187 -205 -269 -330 -35 -52 -66
    -96 -69 -97 -4 -2 -17 52 -29 120 -12 67 -54 267 -93 445 -116 530 -128 642
    -95 852 23 140 80 250 130 250 6 0 41 -19 76 -41z"/>
    <path d="M1550 2546 c-75 -20 -141 -58 -195 -112 -64 -64 -82 -103 -65 -143
    26 -63 104 -63 145 0 23 36 85 81 134 97 19 7 69 12 111 12 42 0 92 -5 111
    -12 49 -16 111 -61 134 -97 41 -63 119 -63 145 0 17 40 -1 79 -65 143 -54 54
    -134 99 -206 115 -59 14 -194 12 -249 -3z"/>
    <path d="M3310 2546 c-75 -20 -141 -58 -195 -112 -64 -64 -82 -103 -65 -143
    26 -63 104 -63 145 0 23 36 85 81 134 97 19 7 69 12 111 12 42 0 92 -5 111
    -12 49 -16 111 -61 134 -97 41 -63 119 -63 145 0 17 40 -1 79 -65 143 -54 54
    -134 99 -206 115 -59 14 -194 12 -249 -3z"/>
    <path d="M3350 1905 c-120 -34 -190 -101 -340 -325 -143 -213 -194 -251 -276
        -201 -49 30 -94 150 -94 251 0 62 52 86 129 59 67 -23 128 37 101 100 -26 65
    -169 88 -262 42 l-48 -23 -47 23 c-94 46 -237 23 -263 -42 -27 -63 34 -123
    101 -100 44 15 81 14 107 -5 18 -13 22 -24 22 -72 0 -73 -24 -173 -44 -188 -9
    -6 -22 -27 -31 -47 -23 -56 -103 -90 -221 -95 -57 -3 -106 0 -130 8 -52 17
    -115 62 -139 99 -41 63 -119 63 -145 0 -17 -40 1 -79 65 -143 54 -54 134 -99
    206 -115 96 -22 276 -3 355 37 l38 19 34 -56 c66 -110 150 -176 280 -219 67
    -22 94 -25 212 -25 191 0 326 40 474 137 119 80 250 239 296 364 60 158 22
    394 -75 468 -72 54 -207 76 -305 49z m186 -161 c49 -23 67 -78 63 -191 -4 -77
    -9 -98 -38 -158 -45 -91 -178 -227 -270 -275 l-65 -33 63 74 c71 84 178 241
    212 311 19 40 21 50 10 76 -7 17 -25 36 -42 42 -49 21 -79 0 -128 -86 -94
    -165 -256 -350 -374 -429 -52 -34 -60 -37 -104 -30 -151 22 -254 108 -293 244
    -11 38 -5 39 25 3 13 -15 47 -41 77 -57 44 -24 65 -29 123 -29 126 -1 189 51
    342 282 102 155 172 234 226 257 43 19 131 19 173 -1z"/>
    </g>
</svg>)
}


export default CatIcon;