{
  /*Get New Releases API 레퍼런스를 통해 데이터보이기
  메인페이지에서 20개의 앨범 데이터 보이기
  */
}

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const PUBLIC_TOKEN_URL='https://accounts.spotify.com/api/token'

export async function getPublicAccessToken(){
  const res=await fetch(PUBLIC_TOKEN_URL,{
    method:"POST",
    headers:{
      Authorization:`Basic ${basicAuth}`,
      "Content-Type":'applicatiobn'
    }
  })
}
