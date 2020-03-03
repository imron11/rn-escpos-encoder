import { Barcode, CodeTable, Color, DrawerPin, Font, Justification, PDF417ErrorCorrectLevel, PDF417Type, Position, QRErrorCorrectLevel, RasterMode, TextMode, Underline } from "./Commands";
import Image from "./Image";
import ImageBitmap from "./ImageBitmap";
export default class Printer {
    private encoding;
    private buffer;
    constructor(encoding?: string);
    setEncoding(encoding: string): Printer;
    flush(): Promise<Uint8Array>;
    init(): Printer;
    resetToDefault(): Printer;
    feed(feed?: number): Printer;
    reverse(feed?: number): Printer;
    setBold(bold?: boolean): Printer;
    setDoubleStrike(double?: boolean): Printer;
    setInverse(inverse?: boolean): Printer;
    setUnderline(value: Underline): Printer;
    setJustification(value: Justification): Printer;
    setFont(value: Font): Printer;
    cut(partial?: boolean): Printer;
    openDrawer(pin?: DrawerPin): Printer;
    setColor(color: Color): Printer;
    setCodeTable(table: CodeTable): Printer;
    setTextMode(mode: TextMode): Printer;
    barcode(code: string, type: Barcode, height: number, width: 2 | 3 | 4 | 5 | 6, font: Font, pos: Position): Printer;
    qr(code: string, errorCorrect: QRErrorCorrectLevel, size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16): Printer;
    pdf417(code: string, type?: PDF417Type, height?: number, width?: number, columns?: number, rows?: number, error?: PDF417ErrorCorrectLevel): Printer;
    beep(): Printer;
    setLineSpacing(spacing?: number): Printer;
    raster(image: Image, mode?: RasterMode): Printer;
    hoiImage(image: ImageBitmap): Printer;
    writeLine(value: string, encoding?: string): Printer;
    writeList(values: string[], encoding?: string): Printer;
    close(): Promise<any>;
    open(): Promise<Printer>;
    clearBuffer(): Printer;
    write(value: string | Uint8Array | number, encoding?: string): Printer;
}
