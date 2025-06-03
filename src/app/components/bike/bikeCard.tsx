'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Meta } = Card; 

interface Props {
  id: number;
  title: string;
  description: string;
  location?: string;
}

export const BikeCard: React.FC<Props> = ({ id, title, description, location }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/bike/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await fetch(`/api/bikes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      message.success('Bike deleted successfully');
      router.refresh();
    } catch (err) {
      message.error('Failed to delete bike');
      console.error(err);
    }
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      cover={
        <Image
          src="/bike-placeholder.jpg"
          alt="Bike image"
          width={400}
          height={200}
          style={{ objectFit: 'cover', width: '100%', height: '200px' }}
        />
      }
      style={{ width: 400 }}
      actions={[
        <Link key="edit" href={`/bike/edit/${id}`} onClick={(e) => e.stopPropagation()}>
          <Button type="default">Edit</Button>
        </Link>,
        <Button danger onClick={handleDelete} key="delete">
          Delete
        </Button>,
      ]}
    >
      <Meta
        title={title}
        description={
          <>
            <p>{description}</p>
            {location && (
              <p style={{ marginTop: 8, fontStyle: 'italic', color: '#555' }}>
                Location: {location}
              </p>
            )}
          </>
        }
      />
    </Card>
  );
};
