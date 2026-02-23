import UserProfilePage from "@/components/UserServerSideFetching";
export const metadata = {
    title: 'User Profile - Developer Community',
    description: 'See user details',
};

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
   const { username} = await params;
  return (
  <UserProfilePage username={username}/>
);
}; export default Page ;

