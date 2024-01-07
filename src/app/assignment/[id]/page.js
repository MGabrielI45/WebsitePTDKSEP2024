'use client'

import { usePathname, useRouter } from 'next/navigation';
import AssignmentDetails from '@/components/AssignmentDetails'; // Update the path accordingly
import { listReminder } from '@/app/constants'; // Import your listReminder

const AssignmentPage = () => {
  const router = useRouter();
  const { id } = router.query || {};
  
  // fetching sesad
  
  const curPath = usePathname();
  const idx = parseInt(curPath[curPath.length - 1], 10);
  
  // console.log(idx);
  // Find the selected assignment from the listReminder
  
  const selectedAssignment = listReminder[idx];

  return ( 
    <AssignmentDetails assignment={selectedAssignment} />
  );
};

export default AssignmentPage;
