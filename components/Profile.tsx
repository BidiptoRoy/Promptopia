import { Prompt } from "./Feed";
import PromptCard from "./PromptCard";

interface Props {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (post: Prompt) => void;
  handleDelete: (post: Prompt) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post: Prompt) => (
          <PromptCard
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
