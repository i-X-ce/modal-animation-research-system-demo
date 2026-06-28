import { withBasePath } from "@/consts/path";
import { Product } from "../_types/product";

let cnt = 0;

const generateId = () => {
  return `p${++cnt}`;
};

const generateImgPath = () => {
  return withBasePath(
    `/images/meat/meat${((cnt % 12) + 1).toString().padStart(3, "0")}.jpg`,
  );
};

// mogrify -path dist -format jpg -quality 85 *.png

export const products: Product[] = [
  // 牛肉：カルビ・ロース・ハラミ系（各10種）
  {
    id: generateId(),
    name: "特上カルビ",
    price: 1280,
    img: generateImgPath(),
    desc: "口の中でとろけるような脂の甘みが特徴。厳選されたA5ランクの部位のみを使用し、タレとの相性も抜群でご飯が止まらなくなる一品です。",
  },
  {
    id: generateId(),
    name: "上カルビ",
    price: 980,
    img: generateImgPath(),
    desc: "肉質と脂身のバランスが絶妙な定番カルビ。強火でサッと炙ることで、香ばしい風味とジューシーな旨味が最大限に引き立ちます。",
  },
  {
    id: generateId(),
    name: "中落ちカルビ",
    price: 850,
    img: generateImgPath(),
    desc: "骨の周りのお肉を使用しているため、旨味が非常に濃厚です。噛むたびにジュワッと溢れる肉汁と、深いコクをお楽しみいただけます。",
  },
  {
    id: generateId(),
    name: "熟成カルビ",
    price: 920,
    img: generateImgPath(),
    desc: "じっくりと時間をかけて熟成させることで、赤身の旨味を凝縮させました。柔らかさと深いコクを両立させた、こだわりの逸品です。",
  },
  {
    id: generateId(),
    name: "にんにくカルビ",
    price: 950,
    img: generateImgPath(),
    desc: "特製のにんにくダレにしっかりと漬け込みました。焼いている最中から食欲をそそる香りが広がり、スタミナ満点の美味しさです。",
  },
  {
    id: generateId(),
    name: "ピリ辛カルビ",
    price: 950,
    img: generateImgPath(),
    desc: "自家製の辛味噌ダレがカルビの脂の甘みを引き立てます。お酒のおつまみとしても最高で、辛さと旨味がクセになる味わいです。",
  },
  {
    id: generateId(),
    name: "ねぎ塩カルビ",
    price: 980,
    img: generateImgPath(),
    desc: "たっぷりの刻みねぎと塩ダレでさっぱりと仕上げました。脂の重さを感じさせない軽やかな味わいで、女性にも人気の一品です。",
  },
  {
    id: generateId(),
    name: "厚切りカルビ",
    price: 1100,
    img: generateImgPath(),
    desc: "食べ応えを重視した厚切りカット。豪快に焼き上げることで、外は香ばしく中はミディアムレアな食感に仕上がります。",
  },
  {
    id: generateId(),
    name: "壺漬けカルビ",
    price: 1200,
    img: generateImgPath(),
    desc: "秘伝のタレをたっぷりと吸い込ませた一品。壺の中でゆっくりと味が染み込み、とろけるような柔らかさと深い味わいを実現しました。",
  },
  {
    id: generateId(),
    name: "わさび醤油カルビ",
    price: 1050,
    img: generateImgPath(),
    desc: "脂ののったカルビを、さっぱりとしたわさび醤油で。肉本来の旨味をダイレクトに感じつつ、後味は驚くほど爽やかです。",
  },
  {
    id: generateId(),
    name: "特上ロース",
    price: 1350,
    img: generateImgPath(),
    desc: "きめ細やかな霜降りが美しい最高級ロース。あっさりとした脂の甘みと、赤身の上品な旨味が口の中で見事に調和します。",
  },
  {
    id: generateId(),
    name: "国産ロース",
    price: 980,
    img: generateImgPath(),
    desc: "赤身の旨味が強く、噛むほどに味わい深い国産牛ロース。ヘルシーかつ満足感が高く、最後まで美味しく召し上がれる定番です。",
  },
  {
    id: generateId(),
    name: "焼きしゃぶロース",
    price: 1100,
    img: generateImgPath(),
    desc: "薄切りにしたロースを軽く炙り、ポン酢や卵黄でどうぞ。お肉の繊細な食感と旨味を堪能できる、贅沢な一皿です。",
  },
  {
    id: generateId(),
    name: "熟成ロース",
    price: 1050,
    img: generateImgPath(),
    desc: "熟成肉特有の芳醇な香りが楽しめるロース。しっとりとした質感で、赤身の奥深い旨味をじっくりと味わうことができます。",
  },
  {
    id: generateId(),
    name: "みすじ",
    price: 1400,
    img: generateImgPath(),
    desc: "希少部位のミスジは、とろけるような柔らかさと濃厚な旨味が特徴。サッと焼いてお召し上がりください。口福の極みです。",
  },
  {
    id: generateId(),
    name: "肩ロース",
    price: 920,
    img: generateImgPath(),
    desc: "しっかりとした肉質で、噛み応えと旨味のバランスが抜群。赤身を好む方に最適で、満足感のある食感を楽しめます。",
  },
  {
    id: generateId(),
    name: "ロースステーキカット",
    price: 1500,
    img: generateImgPath(),
    desc: "ステーキサイズで大胆にカットしたロース。赤身の力強い旨味と溢れる肉汁を、ダイナミックに楽しみたい方に捧げます。",
  },
  {
    id: generateId(),
    name: "ガーリックロース",
    price: 1050,
    img: generateImgPath(),
    desc: "ガーリックチップを添えたロースはパンチのある味わい。赤身の旨味をニンニクの風味が引き立て、食欲を加速させます。",
  },
  {
    id: generateId(),
    name: "ねぎ塩ロース",
    price: 1050,
    img: generateImgPath(),
    desc: "たっぷりの特製ねぎ塩だれを乗せて焼き上げるロース。肉の旨味と塩ダレの爽快感が絶妙にマッチした、あと引く美味しさ。",
  },
  {
    id: generateId(),
    name: "赤身ロース",
    price: 880,
    img: generateImgPath(),
    desc: "余計な脂を抑えた、非常にさっぱりとしたロース。健康志向の方や、たくさんお肉を食べたい方にぴったりの部位です。",
  },
  {
    id: generateId(),
    name: "特上ハラミ",
    price: 1450,
    img: generateImgPath(),
    desc: "肉厚で非常に柔らかく、旨味が凝縮された最高級ハラミ。噛みしめるたびに深いコクと香りが広がる、当店自慢の逸品です。",
  },
  {
    id: generateId(),
    name: "熟成ハラミ",
    price: 1050,
    img: generateImgPath(),
    desc: "じっくり熟成させることで、柔らかさを極限まで高めました。口当たりが非常に良く、濃厚なハラミの旨味を存分に堪能できます。",
  },
  {
    id: generateId(),
    name: "厚切りハラミ",
    price: 1200,
    img: generateImgPath(),
    desc: "この厚みだからこそ味わえる弾力と肉汁の量。表面はカリッと、中はジューシーに焼き上げて、食感の違いをお楽しみください。",
  },
  {
    id: generateId(),
    name: "にんにくハラミ",
    price: 1100,
    img: generateImgPath(),
    desc: "ニンニクを効かせた醤油ダレに漬け込んだハラミ。鉄板の組み合わせは、まさに白米泥棒。スタミナ補給に最適な一品です。",
  },
  {
    id: generateId(),
    name: "ピリ辛ハラミ",
    price: 1100,
    img: generateImgPath(),
    desc: "刺激的な辛さがハラミの旨味を格上げします。ご飯にもお酒にもぴったりで、気づけば完食しているはずの美味しさです。",
  },
  {
    id: generateId(),
    name: "希少部位サガリ",
    price: 1300,
    img: generateImgPath(),
    desc: "ハラミに近い部位で、より赤身の旨味が強くさっぱりとしています。非常に柔らかく、いくらでも食べられる軽やかさです。",
  },
  {
    id: generateId(),
    name: "塩ハラミ",
    price: 1050,
    img: generateImgPath(),
    desc: "ハラミの旨味をシンプルに塩で味わう。タレとは違う、お肉本来の繊細な風味と甘みがダイレクトに伝わります。",
  },
  {
    id: generateId(),
    name: "わさび漬けハラミ",
    price: 1150,
    img: generateImgPath(),
    desc: "わさびの香りがハラミの脂の重さをリセット。さっぱりとした後味で、たくさん食べても飽きが来ない上品な味わいです。",
  },
  {
    id: generateId(),
    name: "味噌ハラミ",
    price: 1100,
    img: generateImgPath(),
    desc: "コク深い特製味噌ダレをたっぷりと絡めました。焼くことで味噌が香ばしくキャラメル化し、より深いコクが楽しめます。",
  },
  {
    id: generateId(),
    name: "ネギ盛りハラミ",
    price: 1150,
    img: generateImgPath(),
    desc: "大量のネギとごま油の香りがハラミと抜群の相性。ネギのシャキシャキ感とハラミの弾力を同時に楽しめる人気メニュー。",
  },

  // 牛肉：タン・その他（各10種）
  {
    id: generateId(),
    name: "厚切りタン塩",
    price: 1380,
    img: generateImgPath(),
    desc: "タン元の最も柔らかい部位を贅沢に厚切りに。サクッとした食感の後に、溢れ出るタン特有の旨味と脂の甘みは格別です。",
  },
  {
    id: generateId(),
    name: "特上タン",
    price: 1600,
    img: generateImgPath(),
    desc: "一頭からわずかしか取れない希少なタン元。口の中でとろけるような食感と、上品で洗練された味わいを堪能できる最高級の一品。",
  },
  {
    id: generateId(),
    name: "ねぎ塩タン",
    price: 1150,
    img: generateImgPath(),
    desc: "タンといえばこれ、という定番のねぎ塩味。たっぷりの刻みネギを包んで焼くことで、香り高いタンの旨味が口いっぱいに広がります。",
  },
  {
    id: generateId(),
    name: "タン先スライス",
    price: 800,
    img: generateImgPath(),
    desc: "タン先は弾力が強いため、薄切りにすることで食べやすくしました。噛めば噛むほど深い旨味が出て、お酒のお供に最高です。",
  },
  {
    id: generateId(),
    name: "レモン香るタン",
    price: 1200,
    img: generateImgPath(),
    desc: "レモンの風味がタンの脂のコクを爽やかに包み込みます。後味すっきりで、何皿でも追加したくなる絶品のタンです。",
  },
  {
    id: generateId(),
    name: "わさびタン",
    price: 1250,
    img: generateImgPath(),
    desc: "ピリッとしたわさびを乗せて食べるタンは大人味。タンの食感とわさびの辛味が融合し、驚くほど上品な余韻を残します。",
  },
  {
    id: generateId(),
    name: "梅しそタン",
    price: 1250,
    img: generateImgPath(),
    desc: "梅肉としそを巻いて焼く、さっぱりとした新感覚タン。梅の酸味としその香りが、タンの脂の旨味を完璧に引き立てます。",
  },
  {
    id: generateId(),
    name: "にんにく味噌タン",
    price: 1200,
    img: generateImgPath(),
    desc: "濃厚な味噌とニンニクの組み合わせは最強。タンの独特な歯ごたえと味噌のコクが絡み合い、ご飯が進む味付けです。",
  },
  {
    id: generateId(),
    name: "コリコリタン",
    price: 850,
    img: generateImgPath(),
    desc: "タン特有のコリコリした食感を存分に楽しめる部位。噛み応えがあり、お肉の旨味が長く続いて満足感の高い一皿です。",
  },
  {
    id: generateId(),
    name: "壺漬けタン",
    price: 1300,
    img: generateImgPath(),
    desc: "特製ダレに漬け込むことで、タンに深い味付けをしました。焼くことでタレがキャラメル状になり、香ばしさと旨味が倍増します。",
  },
  {
    id: generateId(),
    name: "牛イチボ",
    price: 1500,
    img: generateImgPath(),
    desc: "牛の尻部分の希少部位。赤身と脂のバランスが非常に良く、濃厚な肉汁が特徴。ステーキのように贅沢に楽しんでいただきたい一品です。",
  },
  {
    id: generateId(),
    name: "ランプ肉",
    price: 1300,
    img: generateImgPath(),
    desc: "非常に柔らかく、脂が控えめな上品な部位。赤身肉本来の滋味深い旨味を感じられ、いくら食べても飽きが来ない美味しさです。",
  },
  {
    id: generateId(),
    name: "カイノミ",
    price: 1400,
    img: generateImgPath(),
    desc: "バラ肉の一部ながらヒレのような柔らかさを持つ希少部位。脂の甘みと赤身の柔らかさが両立した、肉好きにはたまらない一品。",
  },
  {
    id: generateId(),
    name: "ザブトン",
    price: 1600,
    img: generateImgPath(),
    desc: "肩ロースの中でも特にサシが入った部位。口に入れた瞬間に溶け出すような脂の甘みが特徴で、まさに至福の瞬間を体験できます。",
  },
  {
    id: generateId(),
    name: "ランプステーキ",
    price: 1800,
    img: generateImgPath(),
    desc: "分厚くカットした贅沢なランプ肉。赤身の旨味を最大限に楽しめます。じっくり焼き上げて、肉汁を閉じ込めてお召し上がりください。",
  },
  {
    id: generateId(),
    name: "牛ヒレ",
    price: 2000,
    img: generateImgPath(),
    desc: "圧倒的な柔らかさを誇る牛ヒレ。余分な脂がなく、お肉そのものの旨味がダイレクトに伝わる最高級部位です。",
  },
  {
    id: generateId(),
    name: "サーロインスライス",
    price: 1900,
    img: generateImgPath(),
    desc: "霜降りの王様サーロインを薄切りで。鉄板で軽く炙れば、極上の脂が溶け出し、口の中でとろけるような感覚をお楽しみいただけます。",
  },
  {
    id: generateId(),
    name: "牛ランプたたき",
    price: 1200,
    img: generateImgPath(),
    desc: "新鮮なランプ肉を表面だけ香ばしく炙りました。中はしっとりレアで、肉本来の甘みを堪能できる、おつまみに最適な一品です。",
  },
  {
    id: generateId(),
    name: "牛タタキ盛り",
    price: 1300,
    img: generateImgPath(),
    desc: "数種類の赤身部位をタタキでご用意しました。部位ごとの異なる食感と旨味を食べ比べできる、贅沢な盛り合わせです。",
  },
  {
    id: generateId(),
    name: "牛テール焼き",
    price: 1100,
    img: generateImgPath(),
    desc: "骨周りの濃厚な旨味を余すところなく楽しめます。香ばしく焼き上げることで、骨から肉がするりと外れ、抜群の美味しさです。",
  },

  // ホルモン系（30種：ミノ・ホルモン・レバー・ハツ・他）
  {
    id: generateId(),
    name: "上ミノ",
    price: 850,
    img: generateImgPath(),
    desc: "コリコリとした独特の歯ごたえがクセになる一品。丁寧に下処理を施しているため臭みはなく、噛めば噛むほど溢れる旨味を堪能できます。",
  },
  {
    id: generateId(),
    name: "ホルモン（小腸）",
    price: 780,
    img: generateImgPath(),
    desc: "プリプリの食感と、とろける脂がたまらない定番ホルモン。タレとの相性は抜群で、焼くことで甘みがより一層引き立ちます。",
  },
  {
    id: generateId(),
    name: "シマチョウ",
    price: 820,
    img: generateImgPath(),
    desc: "厚みがあり、弾力のある食感が楽しめる部位。脂の甘みが濃厚で、噛むたびに口いっぱいに幸せな脂の味わいが広がります。",
  },
  {
    id: generateId(),
    name: "レバー（肝臓）",
    price: 700,
    img: generateImgPath(),
    desc: "新鮮なレバーは臭みがなく、濃厚でクリーミーな味わい。栄養満点で、女性にもおすすめしたい、とろけるような食感です。",
  },
  {
    id: generateId(),
    name: "ハツ（心臓）",
    price: 750,
    img: generateImgPath(),
    desc: "コリコリとした歯切れの良い食感で、脂が少なくあっさり。お肉の味がしっかり感じられ、最後まで飽きずに食べられる部位です。",
  },
  {
    id: generateId(),
    name: "ギアラ（第4胃）",
    price: 780,
    img: generateImgPath(),
    desc: "独特の食感とコクのある脂が美味しいギアラ。噛めば噛むほど旨味が溢れ、お酒の肴として抜群の相性を誇ります。",
  },
  {
    id: generateId(),
    name: "センマイ（第3胃）",
    price: 700,
    img: generateImgPath(),
    desc: "シャキシャキとした食感が非常に楽しい部位。刺身でも美味しく、焼いてもその軽快な食感は健在で、あっさりといただけます。",
  },
  {
    id: generateId(),
    name: "コリコリ（血管）",
    price: 650,
    img: generateImgPath(),
    desc: "その名の通り、非常に硬い食感が特徴の希少部位。噛み応えがあり、お肉というよりおつまみ感覚で楽しめる人気メニュー。",
  },
  {
    id: generateId(),
    name: "ヤン（ハチノス）",
    price: 750,
    img: generateImgPath(),
    desc: "独特の網目状の見た目が特徴。弾力がありつつも歯切れが良く、旨味をしっかり含んでいるため飽きのこない味わいです。",
  },
  {
    id: generateId(),
    name: "ホルモンミックス",
    price: 1200,
    img: generateImgPath(),
    desc: "その日おすすめの新鮮なホルモンを盛り合わせました。部位ごとに異なる食感と風味を楽しめる、ホルモン好きにはたまらない一皿です。",
  },
  {
    id: generateId(),
    name: "辛味噌ホルモン",
    price: 850,
    img: generateImgPath(),
    desc: "ピリッと辛い味噌ダレで味付けしたホルモン。焼くことで辛味が香ばしさに変わり、ご飯のおかずとしてもお酒のつまみとしても最高。",
  },
  {
    id: generateId(),
    name: "にんにく醤油ホルモン",
    price: 850,
    img: generateImgPath(),
    desc: "スタミナ全開のニンニク醤油ダレ。ホルモンの脂の甘みがニンニクでさらに強調され、濃厚でクセになる味わいに仕上がっています。",
  },
  {
    id: generateId(),
    name: "ねぎ塩ミノ",
    price: 900,
    img: generateImgPath(),
    desc: "ミノの食感を活かしつつ、ねぎ塩でさっぱりと仕上げました。脂が苦手な方でも美味しくいただける、上品なホルモンメニュー。",
  },
  {
    id: generateId(),
    name: "炙りレバー",
    price: 750,
    img: generateImgPath(),
    desc: "新鮮なレバーを軽く炙ってお召し上がりください。中はとろけるようなレアの食感と、レバー特有の深い旨味を堪能できます。",
  },
  {
    id: generateId(),
    name: "ハツ刺し風",
    price: 800,
    img: generateImgPath(),
    desc: "ハツの新鮮なコリコリ食感をタタキで楽しむ一品。ごま油と塩でシンプルに味付けし、素材の美味しさを引き出しました。",
  },
  {
    id: generateId(),
    name: "小腸特盛り",
    price: 1400,
    img: generateImgPath(),
    desc: "大好きな小腸をたっぷり食べたい方へ。特盛りで満足感間違いなし。脂の甘みを心ゆくまで存分に楽しんでください。",
  },
  {
    id: generateId(),
    name: "ハチノス刺し",
    price: 800,
    img: generateImgPath(),
    desc: "丁寧な下処理で臭みを消したハチノスを、特製酢味噌で。お酒が進む、さっぱりとしたおつまみメニューの定番です。",
  },
  {
    id: generateId(),
    name: "焼きセンマイ",
    price: 750,
    img: generateImgPath(),
    desc: "焼くことで香ばしさが加わり、食感がさらに楽しくなります。ポン酢をつけて食べるのが、当店のおすすめのスタイルです。",
  },
  {
    id: generateId(),
    name: "ピリ辛ギアラ",
    price: 850,
    img: generateImgPath(),
    desc: "ピリ辛ダレとの相性が最も良い部位の一つ。噛みしめるたびに溢れる旨味と刺激的な辛さが混ざり合い、箸が止まらなくなります。",
  },
  {
    id: generateId(),
    name: "にんにく味噌ギアラ",
    price: 850,
    img: generateImgPath(),
    desc: "濃厚な味噌とニンニクがギアラの旨味を最大限に引き出します。非常にパワフルな味付けで、お酒もご飯も進むこと間違いなし。",
  },
  {
    id: generateId(),
    name: "ミノサンド",
    price: 950,
    img: generateImgPath(),
    desc: "ミノとミノの間に脂が詰まった希少部位。ミノのコリコリ感と脂のジューシーさが一度に楽しめる、贅沢な一品です。",
  },
  {
    id: generateId(),
    name: "豚ホルモンミックス",
    price: 700,
    img: generateImgPath(),
    desc: "リーズナブルにホルモンを楽しみたいならこれ。豚ホルモンならではの独特の歯ごたえと旨味を、バラエティ豊かに味わえます。",
  },
  {
    id: generateId(),
    name: "鶏ホルモン（砂肝）",
    price: 600,
    img: generateImgPath(),
    desc: "独特の硬い食感がクセになる砂肝。塩コショウでシンプルに焼くのが一番。噛めば噛むほど味が出る、おつまみの名手。",
  },
  {
    id: generateId(),
    name: "鶏ホルモン（ハツ）",
    price: 600,
    img: generateImgPath(),
    desc: "鶏のハツは小ぶりで食べやすいのが特徴。プリッとした食感とあっさりとした脂の旨味が、誰からも愛される美味しさです。",
  },
  {
    id: generateId(),
    name: "鶏ホルモン（せせり）",
    price: 650,
    img: generateImgPath(),
    desc: "首の筋肉部分で、非常に引き締まった弾力が特徴。旨味が凝縮されており、塩ダレで焼くと最高に美味しくいただけます。",
  },
  {
    id: generateId(),
    name: "鶏ホルモン（軟骨）",
    price: 600,
    img: generateImgPath(),
    desc: "コリコリ感がたまらない鶏軟骨。お肉の周りにも身がついており、食べ応えがあります。塩コショウでカリッと焼き上げるのが鉄則。",
  },
  {
    id: generateId(),
    name: "ピリ辛砂肝",
    price: 650,
    img: generateImgPath(),
    desc: "砂肝の食感にピリ辛ダレが絡んで、さらにお酒が進む味わいに。噛むたびに辛味と旨味が広がり、クセになること請け合いです。",
  },
  {
    id: generateId(),
    name: "ねぎ塩せせり",
    price: 700,
    img: generateImgPath(),
    desc: "せせりの旨味をねぎ塩ダレで爽やかに。お肉の力強い食感とねぎのシャキシャキ感がマッチした、非常に完成度の高い一品。",
  },
  {
    id: generateId(),
    name: "ガーリック軟骨",
    price: 650,
    img: generateImgPath(),
    desc: "ニンニクの風味が食欲をそそる軟骨焼き。カリカリに焼いた食感とニンニクの香りで、手が止まらなくなる美味しさです。",
  },
  {
    id: generateId(),
    name: "壺漬けホルモン",
    price: 900,
    img: generateImgPath(),
    desc: "特製ダレに丸一日漬け込んだホルモン。中まで味がしっかりと染み込み、焼くと驚くほどふっくらジューシーに仕上がります。",
  },

  // 豚肉・鶏肉・その他（各10種）
  {
    id: generateId(),
    name: "豚トロ",
    price: 720,
    img: generateImgPath(),
    desc: "豚の首まわりの希少部位で、脂ののったジューシーさが特徴。強火でカリッと焼くことで脂の甘みが凝縮され、ビールに最高の一品。",
  },
  {
    id: generateId(),
    name: "豚バラ",
    price: 650,
    img: generateImgPath(),
    desc: "脂の甘みが存分に楽しめる定番の豚バラ。焼くことで脂が落ち、香ばしさが際立ちます。サンチュに巻いて食べるのがおすすめ。",
  },
  {
    id: generateId(),
    name: "豚ロース",
    price: 680,
    img: generateImgPath(),
    desc: "さっぱりとした赤身の旨味が楽しめる豚ロース。厚切りで提供しているので、お肉を食べたという実感をしっかり味わえます。",
  },
  {
    id: generateId(),
    name: "豚味噌漬け",
    price: 750,
    img: generateImgPath(),
    desc: "自家製味噌ダレに漬け込んだ豚肉。焼くことで味噌が焦げ、香ばしい香りが漂います。ご飯との相性はまさに無敵の組み合わせ。",
  },
  {
    id: generateId(),
    name: "ピリ辛豚バラ",
    price: 700,
    img: generateImgPath(),
    desc: "辛いタレと豚バラの脂は相性抜群。辛味で脂の重さを感じさせず、最後まで飽きずに食べられるパワー系メニュー。",
  },
  {
    id: generateId(),
    name: "ねぎ塩豚トロ",
    price: 780,
    img: generateImgPath(),
    desc: "豚トロの脂の甘みに、さっぱりしたねぎ塩ダレがベストマッチ。後味が良く、ついつい次の一枚に手が伸びる美味しさ。",
  },
  {
    id: generateId(),
    name: "豚ハラミ",
    price: 700,
    img: generateImgPath(),
    desc: "豚のハラミは赤身の旨味が濃厚で、食感が柔らかいのが特徴。牛ハラミとはまた違う、豚ならではの美味しさを楽しんでください。",
  },
  {
    id: generateId(),
    name: "ウインナー盛り合わせ",
    price: 600,
    img: generateImgPath(),
    desc: "パリッと弾ける食感が楽しいソーセージ盛り合わせ。プレーン、チーズ、ハーブなど、数種類を揃えたお子様にも人気の一皿。",
  },
  {
    id: generateId(),
    name: "ベーコンステーキ",
    price: 650,
    img: generateImgPath(),
    desc: "厚切りベーコンを豪快に焼いてください。脂の旨味と塩気が抜群で、お酒のおつまみとして最強のポテンシャルを誇ります。",
  },
  {
    id: generateId(),
    name: "豚カシラ",
    price: 700,
    img: generateImgPath(),
    desc: "こめかみ部分のお肉で、肉質がしっかりとしており旨味が濃厚。独特の噛み応えがあり、お肉通に愛される部位です。",
  },
  {
    id: generateId(),
    name: "鶏もも肉",
    price: 650,
    img: generateImgPath(),
    desc: "皮目はパリッと、身はしっとりと焼き上がる新鮮な鶏もも肉。特製の塩だれでシンプルに味わうのがおすすめの、満足感のある部位。",
  },
  {
    id: generateId(),
    name: "鶏むね肉",
    price: 600,
    img: generateImgPath(),
    desc: "非常にヘルシーで高タンパクな鶏むね肉。しっとりと柔らかく焼き上げるのがコツです。さっぱりとレモンを絞ってお召し上がりください。",
  },
  {
    id: generateId(),
    name: "鶏ささみ",
    price: 600,
    img: generateImgPath(),
    desc: "究極にヘルシーな鶏ささみ。梅肉を乗せて焼くことで、さっぱりとしつつも旨味を感じられる、女性に大人気のメニューです。",
  },
  {
    id: generateId(),
    name: "鶏手羽先",
    price: 650,
    img: generateImgPath(),
    desc: "骨付き肉ならではの旨味が最高の手羽先。皮のパリパリ感と中のジューシーなお肉のコントラストを楽しんでください。",
  },
  {
    id: generateId(),
    name: "ピリ辛鶏もも",
    price: 700,
    img: generateImgPath(),
    desc: "鶏もも肉にピリ辛ダレをたっぷり。焼くことでタレが絡み、ビールが進む最高のおつまみに。辛いもの好きにはたまりません。",
  },
  {
    id: generateId(),
    name: "にんにく味噌鶏肉",
    price: 700,
    img: generateImgPath(),
    desc: "鶏肉と味噌ダレは相性抜群。さらにニンニクでパンチを効かせ、食欲をそそる香りでご飯が進む味わいに仕上がっています。",
  },
  {
    id: generateId(),
    name: "鶏皮焼き",
    price: 550,
    img: generateImgPath(),
    desc: "カリカリに焼いた鶏皮は、まるでスナックのような美味しさ。脂の旨味と塩のシンプルな味付けで、お酒のお供に最高です。",
  },
  {
    id: generateId(),
    name: "鶏せせり塩焼き",
    price: 700,
    img: generateImgPath(),
    desc: "引き締まった肉質と脂のバランスが良い部位。シンプルに塩焼きで、鶏本来の旨味と甘みを存分に堪能してください。",
  },
  {
    id: generateId(),
    name: "バジルチキン",
    price: 750,
    img: generateImgPath(),
    desc: "洋風にバジルソースでマリネした鶏肉。香りが非常に良く、焼くことでバジルの風味が引き立ち、いつもと違う焼肉を楽しめます。",
  },
  {
    id: generateId(),
    name: "鶏肉の壺漬け",
    price: 800,
    img: generateImgPath(),
    desc: "特製ダレにじっくり漬け込んだ鶏肉は驚くほど柔らか。タレの旨味がしっかり染み込んでおり、子供から大人まで大満足の一品。",
  },
] as const;

export const findProductById = (id: Product["id"]) => {
  return products.find((product) => product.id === id);
};

/**
 * ランダムな商品を取得する関数
 * 10%: 同じ商品
 * 40%: 近く（隣あっている）の商品
 * 50%: 遠く（二つ以上離れている）の商品
 * @param prevProductId
 */
export const randomProduct = (
  prevProductId?: Product["id"],
  length = products.length,
) => {
  const prevIndex = products.findIndex(
    (product) => product.id === prevProductId,
  );

  const filteredProducts = products.slice(0, length);

  const random = Math.random();
  if (random < 0.1 && prevIndex !== -1) {
    // 10%の確率で同じ商品を返す
    return filteredProducts[prevIndex];
  } else if (random < 0.5 && prevIndex !== -1) {
    // 40%の確率で近く（隣あっている）商品を返す
    const neighborIndices = [
      prevIndex - 1 >= 0 ? prevIndex - 1 : null,
      prevIndex + 1 < filteredProducts.length ? prevIndex + 1 : null,
    ].filter((index): index is number => index !== null);
    const randomNeighborIndex =
      neighborIndices[Math.floor(Math.random() * neighborIndices.length)];
    return filteredProducts[randomNeighborIndex];
  } else {
    // 50%の確率で遠く（二つ以上離れている）商品を返す
    const farIndices = filteredProducts
      .map((_, index) => index)
      .filter((index) => prevIndex === -1 || Math.abs(index - prevIndex) > 1);
    const randomFarIndex =
      farIndices[Math.floor(Math.random() * farIndices.length)];
    return filteredProducts[randomFarIndex];
  }
};
