declare function testAsync(runAsync: (done?: () => void) => Promise<any>): (done: () => void) => void;
declare module "config";
declare module "mongodb-uri";
