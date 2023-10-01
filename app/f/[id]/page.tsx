import Error404 from '@/components/404';
import FileDownload, { FileInfo } from '@/components/file-download';
import axios from 'axios';

export default async function FilePage(params: { params: { id: string } }) {

  if (!params.params) {
    return (
      <>
        <Error404 />
      </>
    );
  }

  const res = (await axios.get(`${process.env.NEXTAUTH_URL}/api/file/fetch?id=${params.params.id}`)).data;
  const fileInfo = res.data as FileInfo

  if (!res.ok) {
    return (
      <>
        <Error404 />
      </>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {/* <FileDownload fileInfo={file} /> */}
      {/* <div>{JSON.stringify(fileInfo)}</div> */}
     <FileDownload file={fileInfo}/>
    </div>
  );
}
