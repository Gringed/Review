import { UserButton } from "@clerk/nextjs";



const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-wallpaper flex-col mx-auto">
      <div className="flex flex-col items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 60,
                width: 60,
              },
            },
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default ClerkLayout;
