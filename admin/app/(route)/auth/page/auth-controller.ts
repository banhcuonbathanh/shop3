import { create } from "zustand";
import axios from "axios";
import { User } from "@/types";

interface SignUpState {
  loading: boolean;
  signupSuccess: boolean;
  signupError: string | null;
  setLoading: (loading: boolean) => void;
  setSignupSuccess: (success: boolean) => void;
  setSignupError: (error: string | null) => void;
  register: (params: User) => Promise<void>;
  resetForm: () => void;
}

const signUpController = create<SignUpState>((set) => ({
  loading: false,
  signupSuccess: false,
  signupError: null,
  setLoading: (loading) => set({ loading }),
  setSignupSuccess: (success) => set({ signupSuccess: success }),
  setSignupError: (error) => set({ signupError: error }),
  register: async ({
    name,
    email,
    Password,
    phone_number,
    streetAddress,
    User_type,
  }: User) => {
    console.log(" this is register controller zustand");
    set({ loading: true });
    try {
      const requestData = {
        Username: name,
        Password: Password,
        Email: email,
        User_type: User_type
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
      if (response.status === 201) {
        set({ signupSuccess: true, loading: false });
      } else {
        set({
          signupError: `Unexpected status code: ${response.status}`,
          loading: false
        });
        console.error("1111111111111 createBillboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ signupError: error.message, loading: false });
        console.error("222222222222 createBillboard");
      } else {
        set({ signupError: "An unknown error occurred", loading: false });
        console.error("33333333333333 createBillboard");
      }
    }
  },
  createSignup: async () => {
    // New action
    set({ loading: true });
    try {
      const response = await axios.post(
        "/api/signups",
        {
          Label: "My First Signup",
          ImageUrl: "http://example.com/image.jpg"
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 201) {
        set({ signupSuccess: true, loading: false });
      } else {
        set({
          signupError: `Unexpected status code: ${response.status}`,
          loading: false
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ signupError: error.message, loading: false });
      } else {
        set({ signupError: "An unknown error occurred", loading: false });
      }
    }
  },
  resetForm: () =>
    set({ loading: false, signupSuccess: false, signupError: null })
}));

export default signUpController;
