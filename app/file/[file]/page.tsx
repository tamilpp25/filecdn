import Error404 from '@/components/404';
import FileDownload, { FileInfo } from '@/components/file-download';

export default async function DownloadPage(params: { params: { file: string } }) {

  if (!params.params) {
    return (
      <Error404 />
    );
  }

  const res = (await fetch(`${process.env.NEXTAUTH_URL}/api/file/fetch?id=${params.params.file}`));

  if (!res.ok) {
    return (
      <Error404 />
    )
  }

  const data = await res.json()

  if (!data.ok) {
    return (
      <Error404 />
    )
  }

  const fileInfo = data.data as FileInfo

  return (
    <div className="flex items-center justify-center h-screen">
      {/* <FileDownload fileInfo={file} /> */}
      {/* <div>{JSON.stringify(fileInfo)}</div> */}
      <FileDownload file={fileInfo} />
    </div>
  );
}
