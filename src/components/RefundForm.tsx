import { UserDetails } from '../types';

interface RefundFormProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
}
const RefundForm: React.FC<RefundFormProps> = ({
  userDetails,
  setUserDetails,
}) => {
  return (
    <div>
      <input
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails((userDetails) => {
            return {
              ...userDetails,
              email: e.target.value,
            };
          })
        }
        placeholder="Email Address"
      />
      <input
        value={userDetails.name}
        onChange={(e) =>
          setUserDetails((userDetails) => {
            return {
              ...userDetails,
              name: e.target.value,
            };
          })
        }
        placeholder="Your Name"
      />
      <input
        value={userDetails.name}
        onChange={(e) =>
          setUserDetails((userDetails) => {
            return {
              ...userDetails,
              name: e.target.value,
            };
          })
        }
        placeholder="Invoice Number"
      />
    </div>
  );
};

export default RefundForm;
