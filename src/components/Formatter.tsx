export type FormatterProps = {
    data: any[] | Record<string, any>,
}
export const Formatter = ({ data }: FormatterProps) => {
    if (data == null) return <>-</>;
    if (Array.isArray(data)) {
        return <>{data.map(element => {
            return <><Formatter data={element} /><br /></>
        })}</>
    }
    return <>{Object.entries(data).map(entry => entry.join(': ')).join(' / ')}</>;
}