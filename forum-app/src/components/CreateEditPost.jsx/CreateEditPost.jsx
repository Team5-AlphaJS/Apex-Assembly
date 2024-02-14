import { Button, Container, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CreateEditPost = ({ post, setPost, requestFunc, onEdit }) => {
    const navigate = useNavigate();

    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const TITLE_MIN_LENGTH = 16;
    const TITLE_MAX_LENGTH = 64;
    const DESCRIPTION_MIN_LENGTH = 32;
    const DESCRIPTION_MAX_LENGTH = 8192;

    const updatePost = prop => e => {
        setPost({ ...post, [prop]: e.target.value });
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            if (post.title.length < TITLE_MIN_LENGTH || post.title.length > TITLE_MAX_LENGTH) {
                return console.log(`Title must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long!`);
            }

            if (post.description.length < DESCRIPTION_MIN_LENGTH || post.description.length > DESCRIPTION_MAX_LENGTH) {
                return console.log(`Description must be between ${DESCRIPTION_MIN_LENGTH} and ${DESCRIPTION_MAX_LENGTH} characters long!`)
            }

            await requestFunc(post);

            toast({
                title: `Post ${onEdit ? 'edited' : 'created'} successfully`,
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
            navigate('/home');
        }
    };

    return (
        <Container maxW="100%">
            <h1>{onEdit ? 'Edit' : 'Create'} post</h1>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                name="title"
                id="title"
                value={post.title}
                onChange={updatePost('title')}

            /><br />
            <label htmlFor="description">Description: </label>
            <textarea
                id="description"
                value={post.description}
                onChange={updatePost('description')}
            /><br />
            <select id="category" value={post.category} onChange={updatePost('category')}>
                <option value="">Category</option>
                <option value="drivers">drivers</option>
                <option value="tracks">tracks</option>
                <option value="teams">teams</option>
                <option value="cars">cars</option>
            </select><br />
            <input type="text" placeholder="Image url" value={post.imgUrl} onChange={updatePost('imgUrl')} />
            <Button type="submit" colorScheme="green" bg="green.300" size={'md'} w={150}
                isLoading={isLoading} loadingText={onEdit ? 'Saving' : 'Publishing'} onClick={onSubmit}
            >
                {onEdit ? 'Save': 'Publish'}
            </Button>
        </Container>
    )
};

CreateEditPost.propTypes = {
    post: PropTypes.object.isRequired,
    setPost: PropTypes.func.isRequired,
    requestFunc: PropTypes.func.isRequired,
    onEdit: PropTypes.bool,
};

export default CreateEditPost;