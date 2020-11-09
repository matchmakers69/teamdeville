import { getUserObjectWithNonce } from "../fetchUserInfoByNonce";
import mockAxios from "axios";

it("calls object data with nonce", async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        status: "ok",
        controller: "user",
        method: "register",
        nonce: "d83f35879b"
      }
    })
  );
  const obj = await getUserObjectWithNonce("user");

  expect(obj).toEqual({
    status: "ok",
    controller: "user",
    method: "register",
    nonce: "d83f35879b"
  });
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
