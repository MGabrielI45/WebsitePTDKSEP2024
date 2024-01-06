// app/pages/assignment/[id].js

'use client'

import { useRouter } from 'next/navigation';
import AssignmentDetails from '@/components/AssignmentDetails'; // Update the path accordingly

const AssignmentPage = () => {
    const router = useRouter();
    const { id } = router.query || {}; // This will capture the assignment ID from the URL
  
    // Fetch the assignment details based on the ID (you can use this ID to filter from your list)
  
    // Mock assignment data for demonstration
    const assignment = {
      judul: 'Sample Assignment',
      tanggal: 'Some date',
      deskripsi: 'Assignment description',
    };
  
    return ( 
        <AssignmentDetails assignment={assignment} />
    );
};

export default AssignmentPage;
