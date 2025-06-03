'use server';

import { Button, Col, Row, Typography } from 'antd';
import Link from 'next/link';
import { BikeCard } from './components/bike/bikeCard';
import { getAllBikes } from './lib/actions';

const { Title } = Typography; 

export default async function Home() {
  const bikes = await getAllBikes();

  return (
    <main>
      <Title style={{ textAlign: 'center', color: 'inherit' }}>Rent a Bike</Title>

      <Link href="/bike/create">
        <Button type="primary" style={{ marginBottom: '2rem' }}>
          Add Bike
        </Button>
      </Link>

      <div>
        <Row gutter={[24, 24]} justify="center">
          {bikes?.map((bike) => (
            <Col key={bike.id} xs={24} sm={12} md={8}>
              <BikeCard
                id={bike.id}
                title={bike.title}
                description={bike.description}
                location={bike.location}
              />
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
}
