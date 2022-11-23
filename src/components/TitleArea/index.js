import "./titleArea.css";

export default function TitleArea({children,name}) {
  return (
    <div className="titleArea">
      {children}
      <span>{name}</span>
            
    </div>
  )
}
