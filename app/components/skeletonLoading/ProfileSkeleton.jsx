const ProfileSkeleton = () => {
  return (
    <>
      <div className="grid place-items-center mt-12">
        <div className="bg-gray-200 rounded-full w-36 h-36 animate-pulse"></div>
        <div className="flex mt-8 items-center gap-8">
          <div className="bg-gray-200 w-32 h-10 animate-pulse"></div>
          <div className="bg-gray-200 w-32 h-10 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
