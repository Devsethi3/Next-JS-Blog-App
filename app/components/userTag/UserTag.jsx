import Image from "next/image";
const UserTag = ({ user }) => {
  return (
    <>
      <div className="mt-5 flex items-center gap-2">
        <Image
          className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          src={user?.photoURL}
          width={54}
          height={54}
          alt="user"
        />
        <div className="flex flex-col">
          <p className="text-gray-800">{user?.displayName}</p>
          <span className="text-sm text-gray-600 mt-[-3px]">{user?.email}</span>
        </div>
      </div>
    </>
  );
};

export default UserTag;
