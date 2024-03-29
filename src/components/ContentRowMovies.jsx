import { ContentRowItem } from "./ContentRowItem"


export const ContentRowMovies = () => {
    const items = [
        {
            id : crypto.randomUUID(),
            color: "primary",
            title: "Movies in Data Base",
            value : 21,
            icon : "fa-film"
        },
        {
            id : crypto.randomUUID(),
            color: "succes",
            title: "Total awards",
            value : 79,
            icon : "fa-award"
        },
        {
            id : crypto.randomUUID(),
            color: "warning",
            title: "Actors quantity",
            value : 49,
            icon : "fa-user"
        }
    ]
  return (
    <div className="row">
		{
			items.map(({id, title, value, color, icon}) => (
			<ContentRowItem key={id} tile={title} value={value} color={color} icon={icon}/>
			))
		}			
			
											
			
	</div>
  )
}
