export type RepairCategory = 'frontGlass' | 'backGlass' | 'displayModule' | 'battery' | 'rearCamera' | 'other'

export interface RepairPriceItem {
  model: string
  prices: Partial<Record<RepairCategory, number>>
}

export const repairPricing: RepairPriceItem[] = [
  { model: 'iPhone 17', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 5190, other: 19790 } },
  { model: 'iPhone Air', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 4150, rearCamera: 5190, other: 22990 } },
  { model: 'iPhone 17 Pro', prices: { frontGlass: 11990, backGlass: 4990, displayModule: 14990, battery: 4150, rearCamera: 7990, other: 25990 } },
  { model: 'iPhone 17 Pro Max', prices: { frontGlass: 12290, backGlass: 4990, displayModule: 15090, battery: 4150, rearCamera: 7990, other: 27500 } },
  { model: 'iPhone 16', prices: { frontGlass: 8990, backGlass: 4990, displayModule: 11790, battery: 3350, rearCamera: 5190, other: 17790 } },
  { model: 'iPhone 16e', prices: { frontGlass: 7890, backGlass: 4990, displayModule: 11490, battery: 3350, rearCamera: 4590, other: 16990 } },
  { model: 'iPhone 16 Plus', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 5490, other: 19790 } },
  { model: 'iPhone 16 Pro', prices: { frontGlass: 11990, backGlass: 4990, displayModule: 14190, battery: 4150, rearCamera: 6790, other: 21090 } },
  { model: 'iPhone 16 Pro Max', prices: { frontGlass: 12290, backGlass: 4990, displayModule: 15090, battery: 4150, rearCamera: 6790, other: 21090 } },
  { model: 'iPhone 15', prices: { frontGlass: 8990, backGlass: 4990, displayModule: 11790, battery: 3350, rearCamera: 8090, other: 19990 } },
  { model: 'iPhone 15 Plus', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 8090, other: 21990 } },
  { model: 'iPhone 15 Pro', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 10590, other: 21790 } },
  { model: 'iPhone 15 Pro Max', prices: { frontGlass: 12290, backGlass: 4990, displayModule: 15090, battery: 3350, rearCamera: 12290, other: 22990 } },
  { model: 'iPhone 14', prices: { frontGlass: 8990, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 5510, other: 19090 } },
  { model: 'iPhone 14 Plus', prices: { frontGlass: 10790, backGlass: 4990, displayModule: 13490, battery: 3350, rearCamera: 6790, other: 21090 } },
  { model: 'iPhone 14 Pro', prices: { frontGlass: 10790, backGlass: 16290, displayModule: 19290, battery: 3350, rearCamera: 7670, other: 20990 } },
  { model: 'iPhone 14 Pro Max', prices: { frontGlass: 12290, backGlass: 17990, displayModule: 20890, battery: 3350, rearCamera: 7670, other: 22990 } },
  { model: 'iPhone 13', prices: { frontGlass: 8990, backGlass: 11090, displayModule: 14790, battery: 2990, rearCamera: 5190, other: 14790 } },
  { model: 'iPhone 13 mini', prices: { frontGlass: 7190, backGlass: 9390, displayModule: 13290, battery: 2990, rearCamera: 5190, other: 13290 } },
  { model: 'iPhone 13 Pro', prices: { frontGlass: 8990, backGlass: 14490, displayModule: 15690, battery: 2990, rearCamera: 5190, other: 16590 } },
  { model: 'iPhone 13 Pro Max', prices: { frontGlass: 10790, backGlass: 16290, displayModule: 19790, battery: 2990, rearCamera: 5190, other: 19790 } },
  { model: 'iPhone 12', prices: { frontGlass: 8990, backGlass: 11090, displayModule: 14790, battery: 2990, rearCamera: 5190, other: 14790 } },
  { model: 'iPhone 12 mini', prices: { frontGlass: 7190, backGlass: 9390, displayModule: 13290, battery: 2990, rearCamera: 5190, other: 13290 } },
  { model: 'iPhone 12 Pro', prices: { frontGlass: 8990, backGlass: 14490, displayModule: 15690, battery: 2990, rearCamera: 5190, other: 16590 } },
  { model: 'iPhone 12 Pro Max', prices: { frontGlass: 10790, backGlass: 16290, displayModule: 19790, battery: 2990, rearCamera: 5190, other: 19790 } },
  { model: 'iPhone 11', prices: { frontGlass: 6590, battery: 2990, other: 13290 } },
  { model: 'iPhone 11 Pro', prices: { frontGlass: 8990, battery: 2990, other: 16590 } },
  { model: 'iPhone 11 Pro Max', prices: { frontGlass: 10790, battery: 2990, other: 16590 } },
  { model: 'iPhone XR', prices: { frontGlass: 6590, battery: 2990, other: 13290 } },
  { model: 'iPhone XS', prices: { other: 16590 } },
  { model: 'iPhone X', prices: { other: 16590 } },
  { model: 'iPhone 8', prices: { frontGlass: 5190, battery: 2290 } },
  { model: 'iPhone 8 Plus', prices: { frontGlass: 5190, battery: 2290, other: 13290 } },
  { model: 'iPhone 7', prices: { frontGlass: 5190, battery: 2290, other: 9790 } },
  { model: 'iPhone 7 Plus', prices: { frontGlass: 5490, battery: 2290, other: 12990 } },
  { model: 'iPhone SE (第二代)', prices: { frontGlass: 4590, battery: 2290, other: 9790 } },
  { model: 'iPhone SE (第三代)', prices: { frontGlass: 4590, battery: 2290, other: 9790 } },
]
