import Profile from "@/components/profileServerSideFetching";
export const metadata = {
    title: 'Profile - Developer Community',
    description: 'Your profile information',
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  return <Profile id={(await params).id} />;
  
};

export default Page;
