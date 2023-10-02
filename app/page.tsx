import FileSearchHome from '@/components/file-search-overall';
import NoAuth from '@/components/no-auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return <NoAuth />
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!
    }
  })

  if (!user) {
    return  <NoAuth />
  }

  const files = await prisma.file.findMany({
    where: {
      userId: user.id
    }
  })

  return <FileSearchHome user={session.user?.name!} files={files.map(e => {
    return {
      createdAt: e.createdAt,
      id: e.id,
      name: e.name,
      size: e.size.toString()
    }
  })}/>
}
