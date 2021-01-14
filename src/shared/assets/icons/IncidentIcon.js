import React from 'react';

const IncidentIcon = ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
    <g fill="none" fillOpacity={`${active ? "1" : ".8"}`} fillRule="evenodd" opacity={`${active ? "1" : ".8"}`}>
        <g fill="#31326F" fillRule="nonzero">
            <g>
                <path d="M29.074 8.969c0 1.262-.838 2.03-1.45 2.594-.232.213-.664.602-.662.748.004.57-.415 1.026-.935 1.026h-.008c-.516 0-.938-.442-.942-1.01-.008-1.118.737-1.788 1.335-2.34.47-.432.777-.736.777-1.014 0-.564-.418-1.022-.932-1.022s-.932.458-.932 1.022c0 .57-.422 1.033-.942 1.033s-.942-.463-.942-1.033c0-1.703 1.263-3.089 2.816-3.089s2.817 1.382 2.817 3.085zm-3.029 5.322c-.52 0-.921.462-.921 1.033v.008c0 .57.401 1.03.921 1.03s.942-.467.942-1.038c0-.57-.421-1.033-.942-1.033zm-18.99 7.197c-.52 0-.942.463-.942 1.033 0 .571.421 1.034.942 1.034h.078c.52 0 .942-.463.942-1.034 0-.57-.421-1.033-.942-1.033h-.078zm3.274 0c-.52 0-.942.463-.942 1.033 0 .571.422 1.034.942 1.034h.079c.52 0 .942-.463.942-1.034 0-.57-.422-1.033-.942-1.033h-.079zM38 4.985v11.63c0 2.754-2.013 4.988-4.524 4.988H21.258c-.24 0-.436-.001-.6-.005-.173-.004-.367-.006-.443.004-.079.057-.272.251-.458.44l-.248.246-3.456 3.455c-.276.276-.684.348-1.026.183-.341-.166-.58-.536-.58-.946V14.026h-9.87c-1.472 0-2.693 1.323-2.693 2.937v11.63c0 1.614 1.22 2.883 2.693 2.883h13.648c.235 0 .455.119.628.292l2.816 2.848v-9.82c0-.57.422-1.033.943-1.033.52 0 .942.462.942 1.033v12.162c0 .41-.214.774-.555.94-.123.059-.245.082-.374.082-.23 0-.458-.104-.635-.281l-4.13-4.156H4.576C2.066 33.543 0 31.346 0 28.593v-11.63c0-2.754 2.066-5.003 4.577-5.003h9.87V4.985c0-2.753 2.08-4.965 4.592-4.965h14.437C35.986.02 38 2.232 38 4.985zm-1.884 0c0-1.614-1.168-2.899-2.64-2.899H19.039c-1.472 0-2.708 1.285-2.708 2.9v17.652l1.894-1.877c.088-.088.186-.168.258-.24.865-.875 1.086-1.015 2.214-.99.154.004.337.006.56.006h12.219c1.472 0 2.64-1.308 2.64-2.922V4.985z" transform="translate(-22 -265) translate(22 265)"/>
            </g>
        </g>
    </g>
</svg>

);

export default IncidentIcon;
