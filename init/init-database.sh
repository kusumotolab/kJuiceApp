# デモ用のユーザを追加' :XPOST
curl -X POST -H "Content-Type:application/json"  -d '{"name":"r-takaic","displayName":"髙市","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"r-takagi","displayName":"高木","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"h-watanb","displayName":"渡辺","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"shu-hsmt","displayName":"橋本","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"m-tanigt","displayName":"谷口","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"k-kotou","displayName":"古藤","attribute":"m2"}'  'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"m-iriyam","displayName":"入山","attribute":"m2"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"h-yosiok","displayName":"吉岡","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"t-ishino","displayName":"石野","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"tk-iwase","displayName":"岩瀬","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"fumy-oda","displayName":"小田","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"r-kaichi","displayName":"開地","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"h-takesg","displayName":"竹重","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"t-ou","dislayName":"王","attribute":"m1"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"y-kaimor","displayName":"皆森","attribute":"b4"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"hkr-kubo","displayName":"久保","attribute":"b4"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"w-mabuti","displayName":"馬渕","attribute":"b4"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"k-mihara","displayName":"三原","attribute":"b4"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"ryg-wtnb","displayName":"渡邊","attribute":"b4"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"kusumoto","displayName":"楠本","attribute":"teature"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"shins","displayName":"柗本","attribute":"teature"}' 'http://localhost/backend/member/add'
curl -X POST -H "Content-Type:application/json"  -d '{"name":"higo","displayName":"肥後","attribute":"teature"}' 'http://localhost/backend/member/add'


##  -X POST -H "Content-Type:application/json"デモ用のアイテムを追加
curl -X POST -H "Content-Type:application/json" -d '{"name":"CocaCola","sellingprice":"80","costprice":"70","grouping":"juice"}' 'http://localhost/backend/item/add'
curl -X POST -H "Content-Type:application/json" -d '{"name":"Fanta","sellingprice":80,"costprice":70,"grouping":"juice"}' 'http://localhost/backend/item/add'
curl -X POST -H "Content-Type:application/json" -d '{"name":"GogoTea","sellingprice":100,"costprice":80,"grouping":"juice"}' 'http://localhost/backend/item/add'
curl -X POST -H "Content-Type:application/json" -d '{"name":"Water","sellingprice":100,"costprice":40,"grouping":"juice"}' 'http://localhost/backend/item/add'
curl -X POST -H "Content-Type:application/json" -d '{"name":"PotatoChips","sellingprice":100,"costprice":80,"grouping":"food"}' 'http://localhost/backend/item/add'
curl -X POST -H "Content-Type:application/json" -d '{"name":"Dagashi","sellingprice":100,"costprice":80,"grouping":"food"}' 'http://localhost/backend/item/add'