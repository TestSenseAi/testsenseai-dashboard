import {
  VStack,
  HStack,
  Avatar,
  Text,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { MoreVertical, Reply, Edit2, Trash } from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../types/collaboration';

interface CommentThreadProps {
  comments: Comment[];
  onReply: (parentId: string, content: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onResolve: (commentId: string) => void;
}

export function CommentThread({
  comments,
  onReply,
  onEdit,
  onDelete,
  onResolve,
}: CommentThreadProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSubmit = (type: 'reply' | 'edit') => {
    if (!content.trim()) return;

    if (type === 'reply' && replyingTo) {
      onReply(replyingTo, content);
      setReplyingTo(null);
    } else if (type === 'edit' && editing) {
      onEdit(editing, content);
      setEditing(null);
    }
    setContent('');
  };

  const renderComment = (comment: Comment, depth = 0) => (
    <Box key={comment.id} ml={depth * 8}>
      <HStack align='start' spacing={3} mb={4}>
        <Avatar size='sm' name={comment.author.name} src={comment.author.avatar} />
        <Box flex={1}>
          <HStack justify='space-between' mb={1}>
            <HStack>
              <Text fontWeight='medium'>{comment.author.name}</Text>
              <Text fontSize='sm' color='gray.400'>
                {formatDistanceToNow(new Date(comment.timestamp))} ago
              </Text>
            </HStack>
            <HStack>
              {comment.status === 'resolved' && (
                <Text fontSize='sm' color='green.400'>
                  Resolved
                </Text>
              )}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MoreVertical size={16} />}
                  variant='ghost'
                  size='sm'
                />
                <MenuList>
                  <MenuItem icon={<Reply size={16} />} onClick={() => setReplyingTo(comment.id)}>
                    Reply
                  </MenuItem>
                  <MenuItem
                    icon={<Edit2 size={16} />}
                    onClick={() => {
                      setEditing(comment.id);
                      setContent(comment.content);
                    }}>
                    Edit
                  </MenuItem>
                  {comment.status !== 'resolved' && (
                    <MenuItem onClick={() => onResolve(comment.id)}>Mark as Resolved</MenuItem>
                  )}
                  <MenuItem
                    icon={<Trash size={16} />}
                    color='red.400'
                    onClick={() => {
                      onDelete(comment.id);
                      toast({
                        title: 'Comment deleted',
                        status: 'success',
                        duration: 3000,
                      });
                    }}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>

          {editing === comment.id ? (
            <VStack align='stretch' spacing={2}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Edit your comment...'
                rows={3}
              />
              <HStack justify='flex-end'>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    setEditing(null);
                    setContent('');
                  }}>
                  Cancel
                </Button>
                <Button size='sm' colorScheme='brand' onClick={() => handleSubmit('edit')}>
                  Save
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Text>{comment.content}</Text>
          )}

          {replyingTo === comment.id && (
            <VStack align='stretch' spacing={2} mt={4}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write a reply...'
                rows={3}
              />
              <HStack justify='flex-end'>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    setReplyingTo(null);
                    setContent('');
                  }}>
                  Cancel
                </Button>
                <Button size='sm' colorScheme='brand' onClick={() => handleSubmit('reply')}>
                  Reply
                </Button>
              </HStack>
            </VStack>
          )}
        </Box>
      </HStack>

      {comment.replies?.map((reply) => renderComment(reply, depth + 1))}
    </Box>
  );

  return (
    <VStack align='stretch' spacing={4}>
      {comments.map((comment) => renderComment(comment))}
    </VStack>
  );
}
