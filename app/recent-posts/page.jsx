"use client";
import { useRouter } from "next/navigation";
import { usePostState } from "../context/postContext/PostContext";
import { useUserState } from "../context/userContext/UserContext";
import Image from "next/image";

const RecentPostPage = () => {
  const { user } = useUserState();
  const { listOfPins } = usePostState();
  console.log(listOfPins);
  console.log(user);
  const router = useRouter();

  const formatDate = (id) => {
    const date = new Date(parseInt(id));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="text-center text-3xl text-gray-700 border-b-2 border-teal-600 pb-2 my-8 font-semibold">
          Explore Recent Posts
        </h1>
        <table className="w-full overflow-x-auto">
          <thead>
            <tr className="border-2 table-data">
              <th className="border-2 w-20 py-2 px-3 table-head">S.No.</th>
              <th className="border-2 w-[150px] py-2 px-3 table-head">
                Blog Image
              </th>
              <th className="border-2 w-[400px] py-2 px-3 table-head">
                Title
              </th>
              <th className="border-2 w-[410px] py-2 px-3 table-head">Desc</th>
              <th className="border-2 py-2 px-3 table-head">Post By</th>
              <th className="border-2 py-2 px-3 w-[150px] table-head">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {listOfPins.map((pin, index) => (
              <tr key={index} className="cursor-pointer my-3" onClick={() => router.push("/post/" + pin.id)}>
                <td className="border-2 table-data text-center py-2 px-3">{index + 1}</td>
                <td className="border-2 table-data py-2 px-3 text-center">
                  <div className="flex justify-center">
                    <div className="relative w-[70px] h-[70px]">
                      <Image
                        fill
                        objectFit="cover"
                        src={pin?.image}
                        className="rounded-full"
                        alt="user-image"
                      />
                    </div>
                  </div>
                </td>

                <td className="border-2 table-data py-2 px-3 text-xl font-semibold">
                  {truncateDescription(pin.title, 70)}
                </td>
                <td className="border-2 table-data py-2 text-justify px-3">
                  {truncateDescription(pin.desc, 150)}
                </td>
                <td className="border-2 table-data py-2 text-center px-3">
                  <div className="flex items-center">
                    <Image
                      src={user?.photoURL}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="user-image"
                    />
                    <p className="text-sm font-medium">{pin.userName}</p>
                  </div>
                </td>
                <td className="border-2 table-data py-2 text-center px-3">
                  {formatDate(pin.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentPostPage;
