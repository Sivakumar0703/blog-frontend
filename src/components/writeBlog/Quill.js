import { useEffect, useRef } from 'react';
import Quill from 'quill';

const QuillEditor = ({ setDesc , previousContent }) => {

	const editorRef = useRef(null);
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    [{ 'align': [] }],                                // text allignment
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }], // ol & ul
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
                    ['link'],                                         // hyperlink
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] } , {'size':[]}],                   // font size and style
                    ['clean']                                         // remove formatting button
    ];


	useEffect(() => {
		const quill = new Quill(editorRef.current, {
			theme: 'snow',
            placeholder:"Write Your Content Here...",
			modules: {
				toolbar: toolbarOptions,        
			}, 
		});
		
			quill.clipboard.dangerouslyPasteHTML(previousContent);

		// Detect changes
		quill.on('text-change', () => {
			let content = quill.root.innerHTML;
			console.log('on text change event',quill.root.innerHTML)
			setDesc(content);
		});
		return () => {
			quill.off('text-change');
		};
	}, [setDesc]);


 
	// Rendering the QuillEditor component with a reference to the DOM element
	return <div ref={editorRef} style={{minHeight:"550px",maxHeight:"550px",overflowY:"scroll"}}  id="edit-area">  </div>;
};

export default QuillEditor;