import prisma from './prismadb'

export async function getAllUser(){
    return await prisma.user.findMany()
}

export async function getOneUser(email){
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export async function insertUser(data){
//  isi datanya
//  data = {
    // username: username,
    // email: email,
    // hashedpassword: hashedpassword,
    // name: name,
    // birthTimePlace: birthTimePlace,
    // faculty: faculty,
    // absentNumber: absentNumber,
    // phoneNumber: phoneNumber,
    // emergencyNumber: emergencyNumber,
    // lineId: lineId,
    // instagram: instagram,
    // profilePicture: profilePicture
// }

    try {
        return await prisma.user.create({
            data: data
        }) 
    } catch {
        return "Insert Failed"
    }
}

export async function updateUser(email,data){
    try {
        await prisma.user.update({
            where: {
                email: email
            },
            data: data
        }) 
    } catch {
        return "Update Failed"
    }
}

export async function getReminders(){
    return await prisma.reminder.findMany()
}

export async function insertReminder(data){
    // isi datanya 
    // data = {
    //     title: title, 
    //     descriptionLink: descriptionLink,
    //     deadlineDate: deadlineDate
    // }

    try {
        await prisma.reminder.create({
            data: data
        })
    } catch {
        return "Insert Failed"
    }
}

export async function deleteReminder(title){
    try {
        await prisma.reminder.delete({
            where: {
                title: title
            }
        })
    } catch {
        return "Delete Failed"
    }
}