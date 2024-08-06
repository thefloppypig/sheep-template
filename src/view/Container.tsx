import React from "react"

type ReactContainerProps = { child: HTMLElement } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function ReactContainer(props: ReactContainerProps) {
    const { child, ...rest } = props;
    return <div ref={ref => ref?.replaceChildren(child)} {...rest} ></div>;
}