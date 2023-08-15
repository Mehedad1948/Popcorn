const publicImageUrl =
  'https://pryognxulvntjaoeghoc.supabase.co/storage/v1/object/public/public-images/';

const imagesNames = [
  'cp.webp',
  'jw.jpg',
  'bb.jpg',
  'lr.png',
  'ins.webp',
  'bat.jpg',
];

export const images = imagesNames.map((name) => {
  return { url: publicImageUrl + name, name };
});
