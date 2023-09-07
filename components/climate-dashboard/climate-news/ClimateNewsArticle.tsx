type Props = {
  title: string;
  description: string;
  link: string;
};
export const ClimateNewsArticle = ({ title, description, link }: Props) => {
  return (
    <div className="py-1 text-center">
      <div className="text-[22px] font-light">{title}</div>
      <div className="text-base font-extralight">
        {description}{" "}
        <a href={link} target="_blank">
          <span className="text-sm font-light text-external-link">
            read more...
          </span>
        </a>
      </div>
    </div>
  );
};
